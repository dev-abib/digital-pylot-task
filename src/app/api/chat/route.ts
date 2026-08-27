import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MOCK_CARS, CarItem } from '@/data/mockData';

// System knowledge base for enterprise car rental operations
const RENTAL_POLICIES = {
  company: 'Best Auto / LuxeDrive UK',
  supportPhone: '+44 20 7946 0912',
  supportEmail: 'concierge@bestauto.co.uk',
  locations: [
    'London Heathrow Airport (LHR - Terminals 2, 3, 4, 5)',
    'London Gatwick Airport (LGW - North & South)',
    'Manchester Airport (MAN)',
    'Birmingham Airport (BHX)',
    'Central London Showroom (Mayfair / Park Lane)',
  ],
  minAgeStandard: 21,
  minAgeSupercar: 25,
  minRentalDuration: '1 Day (24 Hours)',
  depositStandard: '$200 - $350 (pre-authorization hold, released immediately upon vehicle return)',
  depositLuxury: '$500 (pre-authorization hold, released immediately upon vehicle return)',
  mileage: 'Unlimited mileage included on all rentals across England, Scotland, and Wales',
  fuelPolicy: 'Full-to-Full (pick up with 100% full tank, return full with zero surcharge)',
  cancellation: '100% Free cancellation up to 48 hours before scheduled pick-up time',
  requiredDocs: 'Full Valid Driver’s License (held 1+ year; UK, EU, US, International accepted), Passport/ID, and credit card for deposit',
  insuranceBase: 'Comprehensive third-party, collision and theft protection included with every vehicle',
  insuranceZeroExcess: 'Optional Zero-Excess Protection Package for $15/day ($0 deductible on tires, glass, bodywork & 24/7 roadside recovery)',
  airportPickup: '24/7 VIP Meet & Greet at terminal arrivals with vehicle prepared curbside',
  gracePeriod: '59-minute complimentary return grace period',
  operatingHours: '24/7 Airport Service & Online Support; Mayfair Showroom open Mon–Sat 8am–8pm, Sun 9am–6pm',
  paymentMethods: 'Visa, MasterCard, American Express, Apple Pay, Google Pay, Debit Cards (Card required for security hold; cash/crypto not accepted for deposit)',
  crossBorder: 'European Green Card and EU travel kits available for France and mainland Europe with 48h notice',
  additionalDriver: 'Spouses and secondary drivers can be added for $10/day (requires valid license held 1+ year)',
};

export async function POST(req: Request) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    // 1. Input Sanitization & Security Guardrails
    const rawMessage = typeof body?.message === 'string' ? body.message : '';
    const message = rawMessage.trim().substring(0, 500); // Prevent overflow / token bombing
    const history = Array.isArray(body?.history) ? body.history.slice(-6) : [];

    if (!message) {
      return NextResponse.json({
        success: true,
        reply: 'Welcome to **Best Auto Concierge**! How can I assist you with vehicle recommendations, rental rates, or booking details today?',
        matchedCars: MOCK_CARS.filter((c) => c.isPopular).slice(0, 2),
      });
    }

    const lowerQuery = message.toLowerCase();

    // 2. Multi-Attribute Vehicle Matching Engine (Brand, Category, Price, Seats, Fuel, Transmission)
    let matchedCars: CarItem[] = [];
    let specificBrand = '';

    // Price extraction (e.g. "under 100", "under $80", "below 150")
    const priceMatch = lowerQuery.match(/\b(?:under|below|less than|max)\s*\$?(\d+)\b/i);
    const maxBudget = priceMatch ? parseInt(priceMatch[1], 10) : null;

    // Seats extraction (e.g. "7 seats", "5 seater", "7-seater")
    const seatsMatch = lowerQuery.match(/\b(\d+)\s*(?:seat|seater|seats|people|passengers)\b/i);
    const requestedSeats = seatsMatch ? parseInt(seatsMatch[1], 10) : null;

    if (/\bbmw\b/i.test(lowerQuery)) {
      specificBrand = 'BMW';
      matchedCars = MOCK_CARS.filter((c) => c.name.toLowerCase().includes('bmw'));
    } else if (/\b(mercedes|benz|amg)\b/i.test(lowerQuery)) {
      specificBrand = 'Mercedes-Benz';
      matchedCars = MOCK_CARS.filter((c) => c.name.toLowerCase().includes('mercedes'));
    } else if (/\baudi\b/i.test(lowerQuery)) {
      specificBrand = 'Audi';
      matchedCars = MOCK_CARS.filter((c) => c.name.toLowerCase().includes('audi'));
    } else if (/\bporsche\b/i.test(lowerQuery)) {
      specificBrand = 'Porsche';
      matchedCars = MOCK_CARS.filter((c) => c.name.toLowerCase().includes('porsche'));
    } else if (/\baston\b|\baston martin\b/i.test(lowerQuery)) {
      specificBrand = 'Aston Martin';
      matchedCars = MOCK_CARS.filter((c) => c.name.toLowerCase().includes('aston'));
    } else if (/\b(rover|land rover|range rover|velar)\b/i.test(lowerQuery)) {
      specificBrand = 'Range Rover';
      matchedCars = MOCK_CARS.filter((c) => c.name.toLowerCase().includes('rover'));
    } else if (/\b(tesla|electric|hybrid|ev|evs)\b/i.test(lowerQuery)) {
      specificBrand = 'Electric & Hybrid';
      matchedCars = MOCK_CARS.filter(
        (c) => c.fuel === 'Electric' || c.fuel === 'Hybrid' || c.name.toLowerCase().includes('tesla')
      );
    } else if (/\b(toyota|rush|corolla)\b/i.test(lowerQuery)) {
      specificBrand = 'Toyota';
      matchedCars = MOCK_CARS.filter((c) => c.name.toLowerCase().includes('toyota') || c.name.toLowerCase().includes('rush'));
    } else if (
      /\b(sport|sports|supercar|supercars|fast car|coupe|speed)\b/i.test(lowerQuery)
    ) {
      specificBrand = 'Sports & Supercars';
      matchedCars = MOCK_CARS.filter(
        (c) => c.category === 'Exclusive Car' || c.type.includes('Sports') || c.price >= 140
      );
    } else if (
      requestedSeats && requestedSeats >= 6 ||
      /\b(7-seater|7 seater|7 seats|7 seat|large suv|family suv)\b/i.test(lowerQuery)
    ) {
      specificBrand = '7-Seater Family SUVs';
      matchedCars = MOCK_CARS.filter(
        (c) => c.seats >= 7 || c.category === 'Large Car'
      );
    } else if (
      /\b(suv|suvs|crossover)\b/i.test(lowerQuery)
    ) {
      specificBrand = 'Luxury SUVs';
      matchedCars = MOCK_CARS.filter(
        (c) => c.type.includes('SUV') || c.category === 'Large Car'
      );
    } else if (
      /\b(cheap|budget|economy|low cost|affordable)\b/i.test(lowerQuery) ||
      (maxBudget && maxBudget <= 90)
    ) {
      specificBrand = 'Budget & Economy';
      matchedCars = MOCK_CARS.filter((c) => c.price < 90 || c.category === 'Small Car');
    } else if (
      /\b(vintage|classic|retro|old car|old model|historic|antique)\b/i.test(lowerQuery)
    ) {
      specificBrand = 'Classic & Heritage';
      matchedCars = MOCK_CARS.filter((c) => c.name.includes('Aston') || c.name.includes('Mercedes'));
    } else if (
      /\b(car|cars|recommend|fleet|available|popular|book|rent)\b/i.test(lowerQuery)
    ) {
      matchedCars = MOCK_CARS.filter((c) => c.isPopular);
    }

    // Apply budget constraint if extracted
    if (maxBudget && matchedCars.length > 0) {
      const budgetFiltered = matchedCars.filter((c) => c.price <= maxBudget);
      if (budgetFiltered.length > 0) {
        matchedCars = budgetFiltered;
      }
    }

    // Apply seats constraint if extracted
    if (requestedSeats && matchedCars.length > 0) {
      const seatsFiltered = matchedCars.filter((c) => c.seats >= requestedSeats);
      if (seatsFiltered.length > 0) {
        matchedCars = seatsFiltered;
      }
    }

    matchedCars = matchedCars.slice(0, 3);

    let aiReply = '';
    let provider = 'embedded-ai-engine';

    // 3. OpenAI SDK Live Production Execution
    let rawApiKey = process.env.OPENAI_API_KEY || '';
    rawApiKey = rawApiKey.trim().replace(/^["']|["']$/g, '');
    const model = (process.env.OPENAI_MODEL || 'gpt-4o-mini').trim().replace(/^["']|["']$/g, '');

    const isValidKey =
      rawApiKey &&
      rawApiKey !== 'your_openai_api_key_here' &&
      rawApiKey.length > 15;

    if (isValidKey) {
      try {
        console.log(`[OpenAI Production API] Dispatching prompt to ${model}...`);
        const openai = new OpenAI({ apiKey: rawApiKey });

        const systemPrompt = `
You are the official AI Luxury Rental Concierge for "Best Auto / LuxeDrive UK".
You represent a high-end UK vehicle rental brand operating across London, Manchester, and Birmingham.

Core Knowledge Base:
- Operational Policies: ${JSON.stringify(RENTAL_POLICIES)}
- Real-Time Fleet Inventory: ${JSON.stringify(
          MOCK_CARS.map((c) => ({
            name: c.name,
            type: c.type,
            price: `$${c.price}/day`,
            seats: c.seats,
            transmission: c.transmission,
            fuel: c.fuel,
            category: c.category,
          }))
        )}

Behavioral Guidelines:
1. Provide polished, executive-level, professional, and friendly assistance.
2. If the user mentions an age under 21 (e.g. 15, 18), clearly explain that the UK legal minimum driving age for Best Auto is 21 (and 25 for luxury supercars).
3. If the user asks for a specific brand or budget limit, highlight the exact matching vehicles from our fleet inventory.
4. If the user asks about past accidents or penalty points, explain that minor past incidents do not prevent rental provided the license is valid (held 1+ year).
5. For policies (deposits, airport delivery, cancellation, insurance), state the exact terms cleanly.
6. Keep responses within 2 structured, easy-to-read paragraphs. Use bold formatting for key metrics.
        `.trim();

        const openAiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
          { role: 'system', content: systemPrompt },
          ...history.slice(-4).map((h: any) => ({
            role: (h.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
            content: h.content,
          })),
          { role: 'user', content: message },
        ];

        const completion = await openai.chat.completions.create({
          model: model || 'gpt-4o-mini',
          messages: openAiMessages,
          temperature: 0.7,
          max_tokens: 450,
        });

        if (completion.choices?.[0]?.message?.content) {
          aiReply = completion.choices[0].message.content;
          provider = 'openai-live';
          console.log('[OpenAI Production API] Response received successfully');
        }
      } catch (openAiError: any) {
        console.error('[OpenAI Production API Fallback]:', openAiError?.message || openAiError);
      }
    }

    // 4. Enterprise Domain Reasoning Engine (Zero-Latency Fallback with 100% Policy Grounding)
    if (!aiReply) {
      const isDurationQuery =
        /\b(minimum renting day|minimum renting|minimum rental|minimum days|minimum day|how many days|rental period|rental duration|1 day|one day|weekend rental|weekly rental|monthly rental|long term|short term|how long)\b/i.test(lowerQuery);

      const isAccidentOrHistoryQuery =
        /\b(accident|crash|crashed|points|conviction|endorsement|fault|claim|past accident|previous accident|driving record)\b/i.test(lowerQuery);

      const isAgeOrEligibilityQuery =
        /\b(year old|years old|can i drive|can i rent|am i eligible|am i allowed|driver age|minimum age|age limit|age requirement|how old|young driver|underage|under 21|under 25)\b/i.test(lowerQuery) ||
        (/\bage\b/i.test(lowerQuery) && !/\b(package|garage|vintage|classic|damage)\b/i.test(lowerQuery));

      const hasUnderageNumber = /\b(1[0-9]|20)\b/.test(lowerQuery);

      const isDepositQuery =
        /\b(deposit|caution|hold|security deposit|security hold)\b/i.test(lowerQuery);

      const isInsuranceQuery =
        /\b(insurance|cover|excess|protection|zero-excess|zero excess|damage|deductible)\b/i.test(lowerQuery);

      const isCancellationQuery =
        /\b(cancel|cancellation|refund|change date|reschedule|terms)\b/i.test(lowerQuery);

      const isLicenseQuery =
        /\b(license|licence|passport|documents|document|id card|permit|international license)\b/i.test(lowerQuery);

      const isMileageFuelQuery =
        /\b(mileage|miles|unlimited mileage|fuel|petrol|diesel|gas|tank|full to full)\b/i.test(lowerQuery);

      const isAirportDeliveryQuery =
        /\b(airport|pickup|pick up|pick-up|heathrow|gatwick|manchester|birmingham|delivery|terminal|meet and greet|where are you|location|locations|address|office)\b/i.test(lowerQuery);

      const isPaymentQuery =
        /\b(cash|crypto|bitcoin|amex|american express|apple pay|debit card|payment method|pay with)\b/i.test(lowerQuery);

      const isCrossBorderQuery =
        /\b(europe|cross border|france|abroad|ferry|overseas|scotland|ireland)\b/i.test(lowerQuery);

      const isAdditionalDriverQuery =
        /\b(additional driver|second driver|spouse|two drivers|friend drive)\b/i.test(lowerQuery);

      const isExtensionQuery =
        /\b(late return|extend|extension|grace period|return late|extra hours)\b/i.test(lowerQuery);

      const isExtrasQuery =
        /\b(child seat|baby seat|booster|gps|sat nav|wifi|extra|extras|accessories)\b/i.test(lowerQuery);

      const isPetOrSmokeQuery =
        /\b(pet|pets|dog|dogs|smoking|smoke|vape|vaping)\b/i.test(lowerQuery);

      const isHoursQuery =
        /\b(open|hours|opening hours|business hours|closing time|working hours)\b/i.test(lowerQuery);

      const isPricingQuery =
        /\b(how much|pricing|price|cost|rates|rate|per day|daily rate|cost per day)\b/i.test(lowerQuery);

      if (isDurationQuery) {
        aiReply = `Our minimum rental duration is **1 full day (24 hours)**.\n\nYou can rent for single days, weekend getaways, weekly business trips, or monthly long-term rentals (which qualify for discounted rates and complimentary vehicle upgrades).`;
      } else if (isAccidentOrHistoryQuery) {
        aiReply = `Having a past minor accident, insurance claim, or points on your driving record generally **does not prevent you from renting with us**, as long as your driver's license is currently full, valid, and held for at least 12 months.\n\nAll rentals come with comprehensive insurance protection. For drivers with major endorsements (such as over 6 penalty points or disqualification history), our concierge team can verify eligibility instantly during booking!`;
      } else if (
        /\b(vintage|classic|retro|old car|old model|historic|antique)\b/i.test(lowerQuery)
      ) {
        aiReply = `While our fleet primarily features **latest-generation 2024–2026 luxury and performance supercars**, vehicles like our **Aston Martin Vantage** and **Mercedes S-Class** deliver timeless British and European classic heritage.\n\nFor bespoke vintage or historic wedding vehicle hires, please contact our VIP concierge desk.`;
      } else if (isAgeOrEligibilityQuery) {
        if (hasUnderageNumber) {
          aiReply = `Unfortunately, you **cannot** rent or drive a vehicle with us.\n\nTo rent and drive with Best Auto in the UK, the legal minimum driver age is **21 years old** for standard fleet models and **25 years old** for luxury supercars. All drivers must hold a full, valid driver's license for at least 12 months.`;
          matchedCars = []; // Underage drivers should not receive car booking cards
        } else {
          aiReply = `To rent with Best Auto, drivers must be at least **${RENTAL_POLICIES.minAgeStandard} years old** for standard fleet models (and **${RENTAL_POLICIES.minAgeSupercar} years old** for supercars and exclusive sports coupes).\n\nYou must hold a full valid driver's license for at least 12 months. UK, EU, and International licenses are all welcomed.`;
        }
      } else if (isDepositQuery) {
        aiReply = `Our security deposit ranges between **${RENTAL_POLICIES.depositStandard}** for standard models and **${RENTAL_POLICIES.depositLuxury}** for performance supercars.\n\nThe deposit is simply a temporary pre-authorization hold placed on your card at pick-up, and is **released immediately** upon vehicle inspection at return.`;
      } else if (isInsuranceQuery) {
        aiReply = `All rentals include comprehensive collision and theft protection.\n\nFor complete peace of mind, we also offer an optional **Zero-Excess Protection Package for $15/day**, covering windshields, tires, bodywork, and 24/7 roadside recovery with $0 deductible.`;
      } else if (isCancellationQuery) {
        aiReply = `We offer **100% Free Cancellation** up to **48 hours prior** to your scheduled pick-up time with zero penalty or hidden fees.\n\nYou can easily modify dates or cancel directly from your confirmation email or by contacting our 24/7 concierge.`;
      } else if (isLicenseQuery) {
        aiReply = `To pick up your vehicle, you will need:\n1. **Valid Driver's License** (held for at least 1 year; UK, EU, US, and International licenses accepted)\n2. **Passport or National ID Card**\n3. **Credit or Debit Card** in the main driver's name for the refundable security hold.`;
      } else if (isMileageFuelQuery) {
        aiReply = `We offer **Unlimited Mileage** on all rentals across the UK!\n\nOur fuel policy is **Full-to-Full**: you receive the car with a 100% full tank and return it full, so you only pay for the exact fuel you use.`;
      } else if (isAirportDeliveryQuery) {
        aiReply = `We provide **24/7 VIP Meet & Greet Airport Delivery** at London Heathrow (LHR), Gatwick (LGW), Manchester (MAN), and Birmingham (BHX).\n\nOur representative will meet you at the arrivals terminal with your vehicle ready curbside, saving you from queueing at car rental counters.`;
      } else if (isPaymentQuery) {
        aiReply = `We accept all major **Credit Cards (Visa, Mastercard, American Express)** as well as **Debit Cards** and **Apple Pay**.\n\nFor the refundable security deposit hold, a card in the main driver's name is required at vehicle collection.`;
      } else if (isCrossBorderQuery) {
        aiReply = `Yes, European cross-border travel is available! We provide European Green Card insurance coverage and EU driving kits for travel into France and mainland Europe with 48 hours prior notice.`;
      } else if (isAdditionalDriverQuery) {
        aiReply = `You can easily add an **Additional Driver** to your rental for $10/day! Any additional driver must meet the minimum age requirements and present a valid driver's license (held for 1+ year) at vehicle collection.`;
      } else if (isExtensionQuery) {
        aiReply = `We offer a complimentary **59-minute grace period** on all vehicle returns. If you need to extend your booking, simply message our concierge or call our support line before your scheduled return time.`;
      } else if (isExtrasQuery) {
        aiReply = `All our fleet vehicles include built-in GPS and Apple CarPlay / Android Auto as standard. We also offer child safety seats (infant, toddler, booster) for $8/day, portable Wi-Fi units, and extra accessories.`;
      } else if (isPetOrSmokeQuery) {
        aiReply = `All Best Auto vehicles are strictly **Non-Smoking and Vape-Free** to maintain showroom quality. Well-behaved pets are welcome with appropriate protective seat covers or carriers.`;
      } else if (isHoursQuery) {
        aiReply = `Our concierge team and airport meet & greet services operate **24/7 (24 hours a day, 7 days a week)**. Our Central London showroom is open Monday through Saturday from 8:00 AM to 8:00 PM, and Sunday from 9:00 AM to 6:00 PM.`;
      } else if (isPricingQuery) {
        aiReply = `Our daily rates start from **$60/day** for economy hybrids, **$72/day** for 7-seater family SUVs, **$120/day** for executive sedans, and **$140–$195/day** for exclusive supercars.\n\nAll rentals include unlimited mileage, comprehensive insurance, and 24/7 roadside assistance with zero hidden fees.`;
      } else if (specificBrand) {
        aiReply = `Here are our top available **${specificBrand}** vehicles in our UK fleet. Each model comes fully sanitized, fueled, and equipped with GPS navigation:`;
      } else if (matchedCars.length > 0) {
        aiReply = `Here are our top vehicle recommendations matching your request. Click **Book** on any vehicle to start your reservation:`;
      } else {
        matchedCars = MOCK_CARS.filter((c) => c.isPopular).slice(0, 2);
        aiReply = `Welcome to **Best Auto Concierge**! We offer a premier fleet of luxury sedans, sports coupes, and family SUVs across the UK.\n\nHow can I assist your journey today? Feel free to ask about vehicle availability, airport delivery, or rental policies.`;
      }
    }

    return NextResponse.json({
      success: true,
      provider,
      reply: aiReply,
      matchedCars: matchedCars.length > 0 ? matchedCars : undefined,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      success: true,
      provider: 'fallback',
      reply: 'Welcome to Best Auto! How can I assist you with vehicle recommendations, rental rates, or booking details today?',
      matchedCars: MOCK_CARS.slice(0, 2),
    });
  }
}

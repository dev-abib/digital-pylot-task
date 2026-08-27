import { useState } from 'react';

export function useCommon() {
  const [state, setState] = useState(null);
  return { state, setState };
}

import { useEffect } from 'react';
import { createContext, useState, ReactNode, useContext } from 'react';

interface TickContextData {
  tick: number;
}

interface TickProviderProps {
  children: ReactNode;
}

const TickContext = createContext<TickContextData>(
  {} as TickContextData
);

export function TickProvider({ children }: TickProviderProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const clock = setInterval(() => {
      setTick(state => state + 1);
    }, 1000);

    return () => clearInterval(clock);
  }, [])



  return (
    <TickContext.Provider value={{ tick }}>
      {children}
    </TickContext.Provider>
  )
}

export function useTick() {
  return useContext(TickContext);
}
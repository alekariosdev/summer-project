import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
  deviceType: DeviceType;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const DEFAULT_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1025,
};

export interface UseDeviceTypeOptions {
  breakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  debounceMs?: number;
}

export function useDeviceType(options: UseDeviceTypeOptions = {}): DeviceInfo {
  const { breakpoints = DEFAULT_BREAKPOINTS, debounceMs = 100 } = options;

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    return {
      deviceType: 'desktop',
      width: 1024,
      height: 768,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newDeviceInfo = getDeviceInfo(width, height, breakpoints);
      setDeviceInfo(newDeviceInfo);
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, debounceMs);
    };

    updateDeviceInfo();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [breakpoints, debounceMs]);

  return deviceInfo;
}

function getDeviceInfo(width: number, height: number, breakpoints: typeof DEFAULT_BREAKPOINTS): DeviceInfo {
  let deviceType: DeviceType;

  if (width < breakpoints.mobile) {
    deviceType = 'mobile';
  } else if (width < breakpoints.tablet) {
    deviceType = 'tablet';
  } else {
    deviceType = 'desktop';
  }

  return {
    deviceType,
    width,
    height,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
  };
}

export function useDeviceTypeSimple(options?: UseDeviceTypeOptions): DeviceType {
  const { deviceType } = useDeviceType(options);
  return deviceType;
}


export function useIsMobile(options?: UseDeviceTypeOptions): boolean {
  const { isMobile } = useDeviceType(options);
  return isMobile;
}


export function useIsTablet(options?: UseDeviceTypeOptions): boolean {
  const { isTablet } = useDeviceType(options);
  return isTablet;
}


export function useIsDesktop(options?: UseDeviceTypeOptions): boolean {
  const { isDesktop } = useDeviceType(options);
  return isDesktop;
}

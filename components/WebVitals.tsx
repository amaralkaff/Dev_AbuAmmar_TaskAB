'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

export function WebVitals() {
  useEffect(() => {
    onCLS((metric) => {
      console.log('CLS (Cumulative Layout Shift):', metric.value);
    });

    onFCP((metric) => {
      console.log('FCP (First Contentful Paint):', metric.value);
    });

    onINP((metric) => {
      console.log('INP (Interaction to Next Paint):', metric.value);
    });

    onLCP((metric) => {
      console.log('LCP (Largest Contentful Paint):', metric.value);
    });

    onTTFB((metric) => {
      console.log('TTFB (Time to First Byte):', metric.value);
    });
  }, []);

  return null;
}

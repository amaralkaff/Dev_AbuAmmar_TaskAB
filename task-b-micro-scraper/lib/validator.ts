export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateUrl(url: string | undefined | null): ValidationResult {
  if (!url?.trim()) {
    return { valid: false, error: 'Invalid URL' };
  }

  try {
    const parsed = new URL(url);

    // Only http/https allowed (no ftp, file, etc)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'Invalid URL' };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL' };
  }
}

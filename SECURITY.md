# Security Audit Report

## Overview
This document outlines the security vulnerabilities found in the wahed.com repository and the fixes applied.

## Vulnerabilities Fixed

### 1. DOM-based XSS via innerHTML (High Severity)
**Description:** Use of `innerHTML` can allow execution of malicious scripts if untrusted data is inserted.

**Files Affected:**
- `landing-page/returns-calculator/script.js`
- `global/download-app.js`

**Fix Applied:**
- Replaced `innerHTML` with `textContent` to safely insert text content without parsing HTML
- This prevents any HTML/JavaScript injection attacks

**Example:**
```javascript
// Before (Vulnerable)
tooltipAmount.innerHTML = `£${formattedAmount}`;

// After (Secure)
tooltipAmount.textContent = `£${formattedAmount}`;
```

### 2. Information Disclosure via console.log (Medium Severity)
**Description:** Excessive logging of data to browser console can expose sensitive information to end users and attackers.

**Files Affected:**
- `hlalfundinfo.js`
- `ummafundinfo.js`
- `etf-page/halalfundinfo.js`
- `etf-page/umma-fetch.js`
- `wahedx/redirects.js`
- `hajj-calculator/step.js`

**Fix Applied:**
- Commented out `console.log` statements that expose fetched data and processed elements
- Kept error logging (`console.error`) for debugging purposes only

**Example:**
```javascript
// Before (Vulnerable)
console.log("Fetched Data:");
console.log(rows);

// After (Secure)
// Removed console.log to prevent data exposure in production
// console.log("Fetched Data:");
// console.log(rows);
```

### 3. Lack of Input Sanitization (Medium Severity)
**Description:** Data fetched from external sources (Google Sheets) was not sanitized before being inserted into the DOM.

**Files Affected:**
- `hlalfundinfo.js`
- `ummafundinfo.js`
- `etf-page/halalfundinfo.js`
- `etf-page/umma-fetch.js`

**Fix Applied:**
- Added enhanced `sanitizeInput()` function with multiple layers of protection:
  - Removes script tags and their content
  - Strips all HTML tags
  - Decodes HTML entities to prevent bypasses (e.g., `&lt;script&gt;`)
  - Removes dangerous patterns like `javascript:` and event handlers
- Applied sanitization to all values retrieved from Google Sheets before DOM insertion

**Example:**
```javascript
// Enhanced sanitization function
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  let sanitized = input;
  
  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove all HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities and remove decoded tags
  const textarea = document.createElement('textarea');
  textarea.innerHTML = sanitized;
  sanitized = textarea.value;
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Remove dangerous patterns
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  
  return sanitized.trim();
};

// Applied to all external data
const rawValue = rows[1].split(",")[columnIndex];
return sanitizeInput(rawValue);
```

## Security Recommendations

### 1. Content Security Policy (CSP)
**Priority:** High

Implement Content Security Policy headers to prevent XSS attacks and control resource loading.

**Recommended CSP Header:**
```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' https://g1386590346.co https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://uploads-ssl.webflow.com;
  img-src 'self' https://uploads-ssl.webflow.com data:;
  connect-src 'self' https://docs.google.com;
  frame-ancestors 'none';
```

### 2. Subresource Integrity (SRI)
**Priority:** Medium

Add integrity attributes to external scripts to ensure they haven't been tampered with.

**Example:**
```html
<script src="https://cdn.example.com/library.js" 
        integrity="sha384-..." 
        crossorigin="anonymous"></script>
```

### 3. HTTPS Everywhere
**Priority:** High

Ensure all resources are loaded over HTTPS:
- ✅ Google Sheets API: Already using HTTPS
- ✅ Webflow CDN: Already using HTTPS
- ✅ Geotargetly: Already using HTTPS

### 4. Input Validation
**Priority:** High

Current implementation:
- ✅ Basic HTML tag removal implemented
- ⚠️ Consider additional validation for specific data types (numbers, dates, etc.)

**Recommended Enhancement:**
```javascript
const validateNumericValue = (input) => {
  const sanitized = sanitizeInput(input);
  const parsed = parseFloat(sanitized);
  return isNaN(parsed) ? 0 : parsed;
};
```

### 5. Rate Limiting for External API Calls
**Priority:** Medium

Implement rate limiting or caching for Google Sheets API calls to prevent:
- Excessive API usage
- Potential DoS through repeated requests
- API quota exhaustion

**Recommendation:**
```javascript
// Cache API responses with expiration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cachedData = null;
let cacheTimestamp = 0;

if (Date.now() - cacheTimestamp < CACHE_DURATION && cachedData) {
  // Use cached data
} else {
  // Fetch new data
}
```

### 6. Third-Party Script Security
**Priority:** Medium

**Current Third-Party Scripts:**
- Geotargetly (geolocation service) - `https://g1386590346.co`
- Splide (carousel library)

**Recommendations:**
- Verify the integrity of third-party scripts
- Consider self-hosting critical libraries
- Regularly audit third-party dependencies
- Implement Subresource Integrity (SRI) checks

### 7. Error Handling
**Priority:** Low

Current implementation:
- ✅ Error logging with `console.error` is appropriate
- ⚠️ Consider user-friendly error messages for production

**Recommendation:**
```javascript
.catch((error) => {
  console.error("Error fetching data:", error);
  // Display user-friendly message
  elements.forEach((element) => {
    element.textContent = "Data temporarily unavailable";
  });
});
```

## Testing Recommendations

### 1. Automated Security Testing
- Integrate OWASP ZAP or similar tools in CI/CD pipeline
- Run regular security scans
- Monitor for known vulnerabilities in dependencies

### 2. Manual Security Testing
- Test XSS attack vectors
- Verify CSP implementation
- Check for information disclosure
- Test error handling paths

### 3. Code Review
- Implement security-focused code reviews
- Use security linting tools (e.g., ESLint security plugins)
- Follow OWASP secure coding guidelines

## Compliance Considerations

### GDPR Compliance
- Ensure geolocation tracking (Geotargetly) has proper user consent
- Review cookie policy and consent mechanisms
- Verify data retention policies for Google Sheets data

### Accessibility
- Ensure security measures don't negatively impact accessibility
- Test with screen readers
- Maintain proper semantic HTML

## Summary

### Vulnerabilities Fixed
- ✅ DOM-based XSS via innerHTML (3 instances)
- ✅ Information disclosure via console.log (multiple files)
- ✅ Lack of input sanitization for external data

### Security Posture
- **Before:** Multiple high and medium severity vulnerabilities
- **After:** Core vulnerabilities addressed, additional hardening recommended

### Next Steps
1. Implement Content Security Policy
2. Add Subresource Integrity for external scripts
3. Implement caching for API calls
4. Set up automated security testing
5. Regular security audits

## Contact
For security concerns or to report vulnerabilities, please contact the security team.

---
*Last Updated: 2026-01-21*
*Audited by: GitHub Copilot Security Audit*

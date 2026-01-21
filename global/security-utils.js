/**
 * Security utility functions for data sanitization and validation
 */

/**
 * Sanitizes input string to prevent XSS attacks
 * Removes HTML tags, script content, and dangerous attributes
 * 
 * @param {*} input - The input to sanitize
 * @returns {string} - Sanitized string safe for DOM insertion
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  let sanitized = input;
  
  // Decode HTML entities first to prevent bypasses like &lt;script&gt;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = sanitized;
  sanitized = textarea.value;
  
  // Remove all script tags and their content (handles variations with whitespace)
  // Using a more comprehensive regex pattern
  sanitized = sanitized.replace(/<script[\s\S]*?<\/script[\s]*>/gi, '');
  
  // Remove all HTML tags (handles self-closing tags and attributes)
  sanitized = sanitized.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript\s*:/gi, '');
  
  // Remove data: and vbscript: protocols
  sanitized = sanitized.replace(/data\s*:/gi, '');
  sanitized = sanitized.replace(/vbscript\s*:/gi, '');
  
  // Remove event handlers - more comprehensive pattern
  // This handles on* attributes in any context
  sanitized = sanitized.replace(/\bon\w+\s*=\s*["']?[^"']*["']?/gi, '');
  
  // Trim whitespace
  return sanitized.trim();
}

/**
 * Validates and sanitizes numeric input
 * 
 * @param {*} input - The input to validate
 * @returns {number} - Validated number or 0 if invalid
 */
function sanitizeNumeric(input) {
  const sanitized = sanitizeInput(input);
  const parsed = parseFloat(sanitized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validates and sanitizes percentage input
 * 
 * @param {*} input - The input to validate
 * @returns {string} - Validated percentage string
 */
function sanitizePercentage(input) {
  const sanitized = sanitizeInput(input);
  const parsed = parseFloat(sanitized);
  if (isNaN(parsed)) return '0%';
  // Ensure percentage is within reasonable bounds
  const clamped = Math.max(-100, Math.min(100, parsed));
  return clamped.toFixed(2) + '%';
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sanitizeInput,
    sanitizeNumeric,
    sanitizePercentage
  };
}

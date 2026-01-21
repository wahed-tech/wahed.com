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
  
  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove all HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities to prevent bypasses like &lt;script&gt;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = sanitized;
  sanitized = textarea.value;
  
  // Remove the decoded HTML tags again (in case entities were used)
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Remove any remaining dangerous patterns
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, ''); // Remove event handlers
  
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

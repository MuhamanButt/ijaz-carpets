// src/utils/utils.js

export const generateBreadcrumbs = (path) => {
    // Split the path and filter out empty segments
    const segments = path.split('/').filter(segment => segment);
  
    // Generate breadcrumb items
    const breadcrumbItems = segments.map((segment, index) => {
      const url = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize the first letter
        url: index === segments.length - 1 ? null : url, // No URL for the last segment
      };
    });
  
    // Add 'Home' breadcrumb
    breadcrumbItems.unshift({ title: 'Home', url: '/' });
  
    return breadcrumbItems;
  };
  

export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};
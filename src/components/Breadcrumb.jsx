import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Breadcrumb = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const { user } = useAuth();

  // Map route paths to breadcrumb labels
  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const items = [];

    const dashboardPath = user?.role === 'admin' ? '/dashboard' : '/franchise-dashboard';
    
    // Handle root or dashboard-only paths
    if (pathnames.length === 0 || 
        (pathnames.length === 1 && (pathnames[0] === 'dashboard' || pathnames[0] === 'franchise-dashboard'))) {
      items.push({
        label: 'Dashboard',
        path: dashboardPath,
        isActive: true,
      });
      return items;
    }

    // Add Dashboard as first item for other routes
    items.push({
      label: 'Dashboard',
      path: dashboardPath,
      isActive: false,
    });

    // Map route segments to labels
    const routeMap = {
      'subscribers': 'Subscribers',
      'my-subscribers': 'My Subscribers',
      'field-staff': 'Field Staff',
      'local-staff': 'Local Staff',
      'billing': 'Billing',
      'offers': 'Offers & Ads',
      'support': 'Support',
      'zone-support': 'Zone Support',
      'settings': 'Settings',
      'profile': 'Profile',
      'collections': 'Collections',
    };

    // Build breadcrumb items
    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathnames.length - 1;
      
      // Handle dynamic segments (IDs)
      if (/^[A-Z0-9-]+$/.test(segment) && segment.length > 5) {
        // Likely an ID
        const parentRoute = pathnames[index - 1];
        if (parentRoute === 'subscribers' || parentRoute === 'my-subscribers') {
          items.push({
            label: 'Subscriber Details',
            path: currentPath,
            isActive: isLast,
          });
        } else {
          items.push({
            label: 'Details',
            path: currentPath,
            isActive: isLast,
          });
        }
      } else {
        const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        items.push({
          label,
          path: currentPath,
          isActive: isLast,
        });
      }
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't show breadcrumb on login/forgot-password pages
  if (location.pathname === '/login' || location.pathname === '/forgot-password') {
    return null;
  }

  return (
    <nav className={`mb-6 ${isDark ? 'text-slate-400' : 'text-gray-600'}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className={`w-4 h-4 mx-2 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
              )}
              {index === 0 && (
                <Home className={`w-4 h-4 mr-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`} />
              )}
              {isLast ? (
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`hover:underline transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;


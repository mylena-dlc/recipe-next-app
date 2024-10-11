import { useOrganizationList } from '@clerk/nextjs';

const Admin = () => {

  const { organizationList, isLoaded, setActive } = useOrganizationList();

  useEffect(() => {
    if (isLoaded) {
      // Find the admin organization from the loaded organization list
      const adminOrganization = organizationList.find(
        (org) => org.membership.role === 'admin'
      );
  
      // If the user is not an admin, redirect to the homepage
      if (!adminOrganization || adminOrganization.membership.role !== 'admin') {
        router.push('/'); // Replace '/' with the homepage URL
      } else {
        // If the user is an admin, no need to wait for the organization list; render the admin page directly
        setShowLoader(false);
      }
    }
  }, [isLoaded, organizationList]);

    return (
      <div>
        <h1>Welcome to the Admin Page!</h1>
        {/* Add any content or components specific to the Admin page here */}
      </div>
    );
  };
  
  export default Admin;
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import FolderSharedRoundedIcon from '@material-ui/icons/FolderSharedRounded';
import Roles from 'utils/role';
import QrIcon from '../../common/icons/QrIcon';

const SidebarLinks = {
  [Roles.END_USER]: [
    {
      title: 'Documents',
      href: '/documents',
      icon: FileCopyRoundedIcon,
    },
    {
      title: 'Update Details',
      href: '/update-details',
      icon: PersonOutlineRoundedIcon,
    },
    {
      title: 'Work History',
      href: '/organization-history',
      icon: WorkRoundedIcon,
    },
    {
      title: 'Documents',
      href: '/document-access-control',
      icon: LockRoundedIcon,
    },
    {
      title: 'Profile',
      href: '/user-details',
      icon: PersonOutlineRoundedIcon,
    },
    {
      title: 'Requests',
      href: '/request-from-thirdparty',
      icon: VerifiedUserRoundedIcon,
    },
  ],
  [Roles.WUNA_ADMIN]: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: DashboardRoundedIcon,
    },
    {
      title: 'Users',
      href: '/users',
      icon: SupervisorAccountRoundedIcon,
    },
    {
      title: 'Enterprises',
      href: '/enterprises',
      icon: BusinessRoundedIcon,
    },
    {
      title: 'Card Order',
      href: '/cards',
      icon: QrIcon,
    },
    {
      title: 'Third Party',
      href: '/third-parties',
      icon: VerifiedUserRoundedIcon,
    },
  ],
  [Roles.ENTERPRISE_USER]: [
    {
      title: 'Users',
      href: '/users',
      icon: PeopleRoundedIcon,
    },
    {
      title: 'Share With Third Party',
      href: '/share-with-third-party',
      icon: FolderSharedRoundedIcon,
    },
    {
      title: 'Third Party',
      href: '/request-to-third-party',
      icon: VerifiedUserRoundedIcon,
    },
  ],
  [Roles.THIRD_PARTY]: [
    {
      title: 'Scan Card',
      href: '/scan-card',
      icon: CreditCardRoundedIcon,
    },
    {
      title: 'Add Document',
      href: '/add-document',
      icon: PersonOutlineRoundedIcon,
    },
    {
      title: 'Requests',
      href: '/request-from-users',
      icon: VerifiedUserRoundedIcon,
    },
  ],
};

export default SidebarLinks;

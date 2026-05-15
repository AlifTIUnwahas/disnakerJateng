// assets
import { FormOutlined, UnorderedListOutlined, FolderOpenOutlined} from '@ant-design/icons';

// icons
const icons = {
  FormOutlined,
  UnorderedListOutlined,
  FolderOpenOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Kelola Website',
  type: 'group',
  children: [
    {
      id: 'berita1',
      title: 'Berita',
      type: 'item',
      url: '/admin/berita',
      icon: icons.UnorderedListOutlined,
      target: false
    },
    {
      id: 'info1',
      title: 'Daftar Informasi',
      type: 'item',
      url: '/admin/informasi',
      icon: icons.FolderOpenOutlined,
      target: false
    },
    {
      id: 'aduan1',
      title: 'Aduan',
      type: 'item',
      url: '/admin/pengaduan',
      icon: icons.FormOutlined,
      target: false
    }
  ]
};

export default pages;

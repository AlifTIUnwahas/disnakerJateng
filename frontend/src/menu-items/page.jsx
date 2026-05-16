// assets
import { FormOutlined, UnorderedListOutlined, FolderOpenOutlined, ContainerOutlined, CalendarOutlined} from '@ant-design/icons';

// icons
const icons = {
  FormOutlined,
  ContainerOutlined,
  UnorderedListOutlined,
  FolderOpenOutlined,
  CalendarOutlined
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
      id: 'bursa1',
      title: 'Bursa Kerja',
      type: 'item',
      url: '/admin/bursa-kerja',
      icon: icons.ContainerOutlined,
      target: false
    },
    {
      id: 'aduan1',
      title: 'Aduan',
      type: 'item',
      url: '/admin/pengaduan',
      icon: icons.FormOutlined,
      target: false
    },
    {
      id: 'agenda1',
      title: 'Agenda Dinas',
      type: 'item',
      url: '/admin/agenda',
      icon: icons.CalendarOutlined,
      target: false
    }
  ]
};

export default pages;

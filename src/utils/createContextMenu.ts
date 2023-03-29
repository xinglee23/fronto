import {createVNode, render} from 'vue';
import ContextMenu from '../components/ContextMenu.vue';

export interface ActionItem {
  action: (cid?: string) => void;
  text: string;
  shortcut: string;
}

const createContextMenu = (
  action: ActionItem[],
  triggerClass = 'edit-wrapper'
) => {
  const container = document.createElement('div');
  const options = {
    action,
    triggerClass,
  };
  const vm = createVNode(ContextMenu, options);
  render(vm, container);
  document.body.appendChild(container);

  return () => {
    render(null, container);
    document.body.removeChild(container);
  };
};

export default createContextMenu;

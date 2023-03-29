import {useStore} from 'vuex';
import {computed} from 'vue';
import {KeyHandler, HotkeysEvent} from 'hotkeys-js';
import useHotkey from '../hooks/useHotkey';
import {GlobalDataProps} from '@/store';

const wrap = (callback: KeyHandler) => {
  const wrapperFn = (e: KeyboardEvent, event: HotkeysEvent) => {
    e.preventDefault();
    callback(e, event);
  };

  return wrapperFn;
};

export default function initHotKeys() {
  const store = useStore<GlobalDataProps>();
  const currentId = computed(() => store.state.editor.currentElement);
  useHotkey('ctrl+c, command+c', () => {
    store.commit('copyComponent', currentId.value);
  });

  useHotkey('ctrl+v, command+v', () => {
    store.commit('pasteCopiedComponent', currentId.value);
  });

  useHotkey('backspace, delete', () => {
    store.commit('deleteElement', currentId.value);
  });

  useHotkey('esc', () => {
    store.commit('setActive', '');
  });

  useHotkey(
    'up',
    wrap(() => {
      store.commit('moveComponent', {
        direction: 'Up',
        amount: 1,
        id: currentId.value,
      });
    })
  );

  useHotkey(
    'down',
    wrap(() => {
      store.commit('moveComponent', {
        direction: 'Down',
        amount: 1,
        id: currentId.value,
      });
    })
  );

  useHotkey(
    'down',
    wrap(() => {
      store.commit('moveComponent', {
        direction: 'Down',
        amount: 1,
        id: currentId.value,
      });
    })
  );
  useHotkey(
    'left',
    wrap(() => {
      store.commit('moveComponent', {
        direction: 'Left',
        amount: 1,
        id: currentId.value,
      });
    })
  );
  useHotkey(
    'right',
    wrap(() => {
      store.commit('moveComponent', {
        direction: 'Right',
        amount: 1,
        id: currentId.value,
      });
    })
  );
  useHotkey('shift+up', () => {
    store.commit('moveComponent', {
      direction: 'Up',
      amount: 10,
      id: currentId.value,
    });
  });
  useHotkey('shift+down', () => {
    store.commit('moveComponent', {
      direction: 'Down',
      amount: 10,
      id: currentId.value,
    });
  });
  useHotkey('shift+left', () => {
    store.commit('moveComponent', {
      direction: 'Left',
      amount: 10,
      id: currentId.value,
    });
  });
  useHotkey('shift+right', () => {
    store.commit('moveComponent', {
      direction: 'Right',
      amount: 10,
      id: currentId.value,
    });
  });
}

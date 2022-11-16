import { Command } from 'cmdk';
import { ComponentChildren } from 'preact';
import { useCallback, useRef, useState } from 'preact/hooks';
import {
  ContactIcon,
  DocsIcon,
  FeedbackIcon,
  PlusIcon,
  ProjectsIcon,
  TeamsIcon
} from './Icons';

export function CMDK() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  const [pages, setPages] = useState<string[]>(['home']);
  const activePage = pages[pages.length - 1];
  const isHome = activePage === 'home';

  const popPage = useCallback(() => {
    setPages(pages => {
      const x = [...pages];
      x.splice(-1, 1);
      return x;
    });
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isHome || inputValue.length) {
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        popPage();
      }
    },
    [inputValue.length, isHome, popPage]
  );

  function bounce() {
    if (ref.current) {
      ref.current.style.transform = 'scale(0.96)';
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = '';
        }
      }, 100);

      setInputValue('');
    }
  }

  return (
    <div className='vercel'>
      <Command
        ref={ref}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            bounce();
          }

          if (isHome || inputValue.length) {
            return;
          }

          if (e.key === 'Backspace') {
            e.preventDefault();
            popPage();
            bounce();
          }
        }}
      >
        <div className='badge-stack'>
          {pages.map((p, i) => (
            <button
              key={p}
              cmdk-vercel-badge=''
              onClick={() => {}} // TODO: Function that will handle navigation between pages
            >
              {p}
            </button>
          ))}
        </div>
        <Command.Input
          autoFocus
          placeholder='What do you need?'
          onValueChange={(value: string) => {
            setInputValue(value);
          }}
        />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          {activePage === 'home' && (
            <Home searchProjects={() => setPages([...pages, 'projects'])} />
          )}
          {activePage === 'projects' && <Projects />}
        </Command.List>
      </Command>
    </div>
  );
}

function Home({ searchProjects }: { searchProjects: Function }) {
  return (
    <>
      <Command.Group heading='Projects'>
        <Item
          shortcut='S P'
          onSelect={() => {
            searchProjects();
          }}
        >
          <ProjectsIcon />
          Search Projects...
        </Item>
        <Item>
          <PlusIcon />
          Create New Project...
        </Item>
      </Command.Group>
      <Command.Group heading='Teams'>
        <Item shortcut='⇧ P'>
          <TeamsIcon />
          Search Teams...
        </Item>
        <Item>
          <PlusIcon />
          Create New Team...
        </Item>
      </Command.Group>
      <Command.Group heading='Help'>
        <Item shortcut='⇧ D'>
          <DocsIcon />
          Search Docs...
        </Item>
        <Item>
          <FeedbackIcon />
          Send Feedback...
        </Item>
        <Item>
          <ContactIcon />
          Contact Support
        </Item>
      </Command.Group>
    </>
  );
}

function Projects() {
  return (
    <>
      <Item>Project 1</Item>
      <Item>Project 2</Item>
      <Item>Project 3</Item>
      <Item>Project 4</Item>
      <Item>Project 5</Item>
      <Item>Project 6</Item>
    </>
  );
}

function Item({
  children,
  shortcut,
  onSelect = () => {}
}: {
  children: ComponentChildren;
  shortcut?: string;
  onSelect?: (value: string) => void;
}) {
  return (
    <Command.Item onSelect={onSelect}>
      {children}
      {shortcut && (
        <div cmdk-vercel-shortcuts=''>
          {shortcut.split(' ').map(key => {
            return <kbd key={key}>{key}</kbd>;
          })}
        </div>
      )}
    </Command.Item>
  );
}

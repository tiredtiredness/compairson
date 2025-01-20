import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';

export const EditableText = ({
  text,
  setText,
  type = 'text',
  placeholder = 'Enter text',
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [newText, setNewText] = useState(text);

  useEffect(() => {
    setNewText(text || '');
    if (text === '') {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [text]);

  return (
    <div className='  w-fit '>
      {isEditing ? (
        <div className='relative flex items-center'>
          {type === 'text' && (
            <input
              type='text'
              name=''
              id=''
              value={newText}
              placeholder={placeholder}
              className='border-2 border-zinc-200 rounded px-2 py-1'
              onChange={e => setNewText(e.target.value)}
              onKeyUp={e => {
                if (e.key === 'Enter' && newText.trim()) {
                  setText(newText);
                  setIsEditing(false);
                }
              }}
            />
          )}
          {type === 'textarea' && (
            <textarea
              name=''
              id=''
              value={newText}
              placeholder={placeholder}
              className='border-2 border-zinc-200 rounded px-2 py-1 w-fit block resize'
              onChange={e => setNewText(e.target.value)}
              onKeyUp={e => {
                if (e.key === 'Enter' && newText.trim()) {
                  setText(newText);
                  setIsEditing(false);
                }
              }}
            />
          )}
          {isEditing && (
            <Icon icon='solar:reply-2-outline' className='absolute -right-6' />
          )}
        </div>
      ) : (
        <div
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => setIsEditing(!isEditing)}
          className='w-fit relative flex items-center'
        >
          {children}
          {isShown && !isEditing && (
            <Icon icon='solar:pen-outline' className='absolute -right-6' />
          )}
        </div>
      )}
    </div>
  );
};

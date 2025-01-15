import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';

export const EditableText = ({
  text,
  setText,
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
    <div className='flex gap-2 items-center'>
      {isEditing ? (
        <input
          type='text'
          name=''
          id=''
          value={newText}
          placeholder={placeholder}
          className='border-2 border-zinc-200 rounded px-2 py-1 w-fit'
          onChange={e => setNewText(e.target.value)}
          onKeyUp={e => {
            if (e.key === 'Enter' && newText.trim()) {
              setText(newText);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <div
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => setIsEditing(!isEditing)}
        >
          {children}
        </div>
      )}
      {isShown && !isEditing && <Icon icon='solar:pen-outline' />}
      {isEditing && <Icon icon='solar:reply-2-outline' />}
    </div>
  );
};

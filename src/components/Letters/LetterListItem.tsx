import LetterType from '@/types/types';

export default function LetterListItem({
  letter,
  handleSelectLetter,
  handleDeleteLetter,
  bgColor,
}: {
  letter: LetterType;
  handleSelectLetter: (
    sender: string,
    receiver: string,
    message: string
  ) => void;
  handleDeleteLetter: (letterId: string) => void;
  bgColor: string;
}) {
  console.log('COLOR', bgColor);
  return (
    <div
      className="py-2 w-full h-auto text-black hover:cursor-pointer"
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
      onClick={() =>
        handleSelectLetter(letter.sender, letter.receiver, letter.message)
      }
    >
      <div className="titleArea m-3 flex flex-row gap-3 items-center justify-between">
        <div className="flex flex-row">
          <div className="letterTitle font-bold pr-2">{letter.title}</div>
          <div className="date font-thin">{letter.createdAt}</div>
        </div>
        <div className="icons flex flex-row">
          <div className="edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="edit icon icon-tabler icons-tabler-outline icon-tabler-edit hover:text-secondary"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </div>

          <div
            className="delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteLetter(letter._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="delete icon icon-tabler icons-tabler-outline icon-tabler-trash hover:text-red-400"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

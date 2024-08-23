interface TagProps {
  description: string;
}

const Tag: React.FC<TagProps> = ({ description }) => {
  return (
    <div
      id="tag"
      className="flex flex-col w-[180px] h-[102px] border-black border justify-between"
    >
      <div className="border-b flex-1 p-1 text-sm">{description}</div>
      <div className="flex flex-row justify-between h-6 p-1 items-center">
        <span className="text-sm font-bold">Géminis</span>
        <span className="text-xs">23/08/2024</span>
      </div>
    </div>
  );
};

export default Tag;

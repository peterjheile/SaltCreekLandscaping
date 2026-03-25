type ReviewCardData = {
  name: string;
  tag: string;
  image: string;
  context: string;
};

export function ReviewCard({
  data,
}: {
  data: ReviewCardData;
}) {
  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="flex flex-row">
          <img
            className="mr-5 mt-2 h-16 w-16 rounded-full object-cover shadow-lg"
            src={data.image}
            alt={data.name}
          />
          <div className="mt-3 flex flex-col">
            <p className="text-l font-bold">{data.name}</p>
            <p className="text-sm text-gray-500">@{data.tag}</p>
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-700">{data.context}</p>
      </div>
    </div>
  );
}
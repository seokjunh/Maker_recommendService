import useSWR from 'swr';

let bookmark = [];
const useBookmark = () => {
  const { data, mutate } = useSWR('bookmark', () => {
    return bookmark;
  });
  return {
    data,
    mutate: (newBookmarks) => {
      bookmark = newBookmarks;
      return mutate();
    },
  };
};

export default useBookmark;

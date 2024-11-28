// import { useEffect, useState } from "react";

// export function useLoadMore<T>(newItems: T[], id: keyof T): T[] {
//   const [mergedItems, setMergedItems] = useState<T[]>([]);

//   useEffect(() => {
//     setMergedItems((prevItems) => {

//       const result: T[] = [];

//       prevItems.forEach(item => {

//         if(!result.find(existingItem => existingItem[id]== item[id]))
//       })
//     });
//   }, [partialData]);

//   return {};
// }

interface Member {
  member_id: number;
  display_name: string;
  gender?: 'm' | 'w';
}
export type DoublesPair = { member1: Member; member2: Member };

export function orderDoublesPair(pair: DoublesPair): DoublesPair {
  const member1= pair.member1;
  const member2= pair.member2;
  const flippedPair = {member2, member1};
  if (!member1.gender || !member2.gender) pair; // demo Member without gender!
  if (member1.gender === member2.gender) {
    // doubles
    return (member1.member_id < member2.member_id) ? pair : flippedPair ;
  } else {
    // mixed
    return member1.gender === 'm' ? pair : flippedPair ;
  }
}

export function getDoublesDisplayName(pair: DoublesPair): string {
  const orderedPair = orderDoublesPair(pair); 
  return orderedPair.member1.display_name + "/" + orderedPair.member2.display_name;
}
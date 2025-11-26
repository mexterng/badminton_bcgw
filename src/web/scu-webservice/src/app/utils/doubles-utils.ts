interface Member {
  member_id: number;
  display_name: string;
  gender?: 'm' | 'w';
}
export type DoublesPair = { member1: Member; member2: Member };

export function orderDoublesPair(member1: Member, member2: Member): DoublesPair {
  const pair = { member1, member2}
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

export function getDoublesDisplayName(member1: Member, member2: Member): string {
  const orderedPair = orderDoublesPair(member1, member2); 
  return orderedPair.member1.display_name + "/" + orderedPair.member2.display_name;
}
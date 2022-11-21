const todoKeys = {
  base: [{ scope: 'todos' }] as const,

  // joinable: (address: string) => [{ ...userKeys.base[0], entity: 'checkJoinable', address }] as const,
  // email: (address: string) => [{ ...userKeys.base[0], entity: 'checkEmail', address }] as const,
  // nickname: (address: string) => [{ ...userKeys.base[0], entity: 'checkNickname', address }] as const,
  // withdraw: (address: string) => [{ ...userKeys.base[0], entity: 'checkWithdrawalDate', address }] as const,
  // profile: (clubCode: string, address: string) => [{ ...userKeys.base[0], clubCode, address }] as const,
  // transaction: (clubCode: string, address: string) =>
  //   [{ ...userKeys.base[0], entity: 'transaction', clubCode, address }] as const,
  // presigned: (contentType: string, address: string) => [{ ...userKeys.base[0], contentType, address }] as const,
};

export default { todoKeys };

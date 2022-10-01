import { BigNumber, ethers } from 'ethers';

import { registerIntruction } from './instruction';

export const STOP = registerIntruction(0x00, 'STOP', (ctx) => ctx.stop());

export const PUSH1 = registerIntruction(
  0x60,
  'PUSH1',

  (ctx) => ctx.getStack().push(BigNumber.from(ctx.readCode(1)).toString()),
);

export const ADD = registerIntruction(0x01, 'ADD', (ctx) => {
  const fst = BigNumber.from(ctx.getStack().pop());
  const snd = BigNumber.from(ctx.getStack().pop());

  return ctx.getStack().push(BigNumber.from(fst.add(snd).mod(ethers.constants.MaxUint256.add(1))).toString());
});

export const MUL = registerIntruction(0x02, 'MUL', (ctx) => {
  const fst = BigNumber.from(ctx.getStack().pop());
  const snd = BigNumber.from(ctx.getStack().pop());

  return ctx.getStack().push(BigNumber.from(fst.mul(snd).mod(ethers.constants.MaxUint256.add(1))).toString());
});

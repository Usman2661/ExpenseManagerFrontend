import { createContext } from 'react';
import React from 'react';

// export interface UserContextInterface {
//   name: string;
//   auth: boolean;
//   userType: string;
// }

export const UserContext = React.createContext<any | null>(null);

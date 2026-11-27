import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-expect-error
import { getReactNativePersistence } from 'firebase/auth';

export const persistence = getReactNativePersistence(AsyncStorage);

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setLocalData(key: string, value: string): Promise<void> {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('Error setting local data:', error);
    }
}

export async function removeLocalData(key: string): Promise<void> {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('Error removing local data:', error);
    }
}

export async function getLocalData(key: string): Promise<string | null> {
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (error) {
        return null;
    }
}

export function isValidValue(value: any): boolean {
    return !(value === undefined || value === null || value === '');
}

export function isCheckValueAndSetParams(params: string, value: any): string {
    return isValidValue(value) ? params + value : '';
}

export function hasProperty<T extends object>(object: T, key: keyof any): boolean {
    return (
        typeof key === 'string' &&
        !Array.isArray(object) &&
        object !== null &&
        Object.prototype.hasOwnProperty.call(object, key)
    );
}

export function isValidObject(obj: Record<string, any>): boolean {
    return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
}

export function getValueFromObject<T extends object, K extends keyof T>(object: T, key: K): any {
    if (hasProperty(object, key) && isValidValue(object[key])) {
        return object[key];
    }
    return '';
}

// file upload or form submission
export function getFormDataObj(obj: Record<string, any>): FormData {
    const formData = new FormData();
    Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
    });
    return formData;
}

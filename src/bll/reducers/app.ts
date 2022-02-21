export type TDevice = 'mobile' | 'tablet' | 'laptop' | 'desktop';
export type TSection = 'top' | 'about' | 'skills' | 'contacts';

const initialState = {
  device: 'desktop' as TDevice,
  currentSection: 'top'
};

export const appReducer = (state: TAppState = initialState, action: TAppActions): TAppState => {
  switch (action.type) {
    case appActionVariables.SET_DEVICE_TYPE:
    case appActionVariables.SET_CURRENT_SECTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// actions
export const setDeviceType = (device: TDevice) =>
  ({
    type: appActionVariables.SET_DEVICE_TYPE,
    payload: { device },
} as const);
export const setCurrentSection = (currentSection: TSection) =>
  ({
    type: appActionVariables.SET_CURRENT_SECTION,
    payload: { currentSection },
} as const);
  
export type TAppState = typeof initialState;
export type TAppActions =
  | ReturnType<typeof setDeviceType>
  | ReturnType<typeof setCurrentSection>;

// variables
const appActionVariables = {
  SET_DEVICE_TYPE: 'APP/SET-DEVICE-TYPE' as const,
  SET_CURRENT_SECTION: 'APP/SET-CURRENT-SECTION' as const,
};
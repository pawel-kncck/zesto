/*
action types
*/

export const LOAD_METADATA_STATE = 'LOAD_METADATA_STATE';

/*
action creators
*/

export const loadMetadataState = (json) => {
  return {
    type: LOAD_METADATA_STATE,
    payload: json,
  };
};

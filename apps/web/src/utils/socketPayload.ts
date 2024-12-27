export const formatAction = (action: string, payload?: any): string => {
  try {
    return JSON.stringify({action, payload});
  } catch (err){
    throw new Error(`Error formatting the action into JSON: ${err}`)
  }
}
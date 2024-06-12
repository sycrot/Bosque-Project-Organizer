export async function createLists(): Promise<any> {
  try {
    localStorage.setItem('bosque', `{"projects":[],"folders":[]}`)
  } catch (error) {
    return error
  }
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bosque') || '')
}

export function updateLocalStorage(item: any) {
  localStorage.setItem("bosque", JSON.stringify(item))
}
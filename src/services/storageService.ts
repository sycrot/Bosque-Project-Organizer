export async function createLists(): Promise<any> {
  try {
    localStorage.setItem('bosque', `{"projects":[],"folders":[], "homeLastVisited": ""}`)
  } catch (error) {
    return error
  }
}

export function getLocalStorage() {
  const localStg = localStorage.getItem('bosque')
  
  return localStg ? JSON.parse(localStorage.getItem('bosque') || '') : null
}

export function updateLocalStorage(item: any) {
  localStorage.setItem("bosque", JSON.stringify(item))
}

export function lastVisitedHome() {
  const localStg = getLocalStorage()

  const date = new Date()
  
  localStg.homeLastVisited = date.toISOString()

  localStorage.setItem("bosque", JSON.stringify(localStg))
}

export function deleteLastVisitedHome() {
  const localStg = getLocalStorage()
  
  localStg.homeLastVisited = ""

  localStorage.setItem("bosque", JSON.stringify(localStg))
}
export function sortItemsByCreatedDate(items: any[]): any[] {
  return items?.slice().sort((a, b) => {
    const dateA = new Date(a.created || 0).getTime();
    const dateB = new Date(b.created || 0).getTime();
    return dateB - dateA;
  });
}

export function sortItemsByLastVisitedDate(items: any[]): any[] {
  return items?.slice().sort((a, b) => {
    const dateA = new Date(a.lastVisited || 0).getTime();
    const dateB = new Date(b.lastVisited || 0).getTime();
    return dateB - dateA;
  });
}

export function getRandomColor() {
  // Gera um número aleatório entre 0 e 16777215 (o maior número hexadecimal de 6 dígitos)
  const aleatoryNumber = Math.floor(Math.random() * 16777215);
  
  // Converte o número para hexadecimal e preenche com zeros à esquerda se necessário
  const colorHex = `#${aleatoryNumber.toString(16).padStart(6, '0')}`;
  
  return colorHex;
}
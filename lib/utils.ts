
export function formatDate(date: Date): string {
    // return format(new Date(date), "MMMM do, yyyy HH:mm") ?? "Date not available";
    return new Date(date).toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      }) ?? "Date not available";
      
}


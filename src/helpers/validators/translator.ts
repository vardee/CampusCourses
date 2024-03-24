export function translateSemester(semester: string) {
    switch (semester) {
      case "Autumn":
        return "Осенний";
      case "Spring":
        return "Весенний";
      default:
        return semester;
    }
  }
  
export function translateCourseStatus(status: string) {
    switch (status) {
      case "Created":
        return "Создан";
      case "OpenForAssigning":
        return "Открыт для записи";
      case "Started":
        return "В процессе обучения";
      case "Finished":
        return "Закрыт";
      default:
        return status;
    }
  }

export  function getStatusColor(status: string) {
    switch (status) {
      case "Created":
        return "grey"; 
      case "OpenForAssigning":
        return "grey"; 
      case "Started":
        return "blue"; 
      case "Finished":
        return "red"; 
      default:
        return "grey"; 
    }
  }
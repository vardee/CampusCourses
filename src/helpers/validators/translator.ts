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

  export function translateStudentStatus(status: string) {
    switch (status) {
      case "InQueue":
        return "в очереди";
      case "Accepted":
        return "принят в группу";
      case "Declined":
        return "отклонен";
      default:
        return status;
    }
  }


  export function translateResults(status: string) {
    switch (status) {
      case "NotDefined":
        return "нет отметки";
      case "Passed":
        return "успешно пройдена";
      case "Failed":
        return "зафейлена";
      default:
        return status;
    }
  }
  export  function getResultsStatusColor(status: string) {
    switch (status) {
      case "NotDefined":
        return "grey"; 
      case "Passed":
        return "green"; 
      case "Failed":
        return "red"; 
      default:
        return "grey"; 
    }
  }
  export  function getStudentStatusColor(status: string) {
    switch (status) {
      case "InQueue":
        return "blue"; 
      case "Accepted":
        return "green"; 
      case "Declined":
        return "red"; 
      default:
        return "grey"; 
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
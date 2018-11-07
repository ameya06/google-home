var getattendees = (name) => {
    switch (name.toLowerCase()) {
        case "ameya":
            return "Ameya Deshmukh"
            break;
        case "jp":
            return "JP Suarez"
            break;
        case "judith":
            return "Judith McKenna"
            break;
        case "kp":
            return "Kerry Pauling"
            break;
        case "wendy":
            return "Wendy Eriksen"
            break;
        case "jon":
            return "Jon Downey"
            break;
        case "lincy":
            return "Lincy Mathew"
            break;
        case "midhun":
            return "Midhun Nair"
            break;
        case "reni":
            return "Reni Thankappan"
            break;
        
        default:
            return ""
            break;
    }

}




exports.getattendees = getattendees
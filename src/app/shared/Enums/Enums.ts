
export enum ViewStateEnum {
    Loading = 100,
    Loaded = 200,
    Error = 500,
    Forbidden = 403,
    NoContent = 204,
    BadRequest = 400,
    NoInternet = 0,
}

export enum ToastTypeEnum {
    Success,
    Info,
    Warning,
    Error
}

export enum NotificationIcon {
    Success = '',
    Info = '',
    Warning = '',
    Error = ''
}

export enum NotificationTemplate {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
}

export enum NotificationHandler {
    PopUp,
    Drawable,
    Toastr
}

export enum OverFlowStrategy {
    HorizontalOverflow,
    VerticalOverflow,
    Menu
}

export enum CustomMatChip {
    Editable = "editable",
    NotEditable = "notEditable"
}

export enum ContentEditableStrategy {
    TextBox,
    Search,
    TextBoxSearch,
    Chips,
    SearchChips
}

export enum WarningPopupStrategy {
    DELETE = 'Delete',
    MarkInactive = 'Mark Inactive'
}

export enum CancelButtonStrategy {
    ResetValue,
    ClearText
}

export enum ShowMethodColor {
    GET = '#26b47f',
    POST = '#ffb401',
    PUT = '#097bed',
    DELETE = '#ed4b48',
    PATCH = ' #808080'
}

export enum ShowMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DEL',
    PATCH = 'PATCH'
}

export enum ComponentName {
    'project' = 'Projects',
    'user' = 'Users',
    'user-group' = 'User Group',
    'user-global' = 'User Global',
    'asset' = 'Assets',
    'roles' = 'Roles',
    'features' = 'Features',
    'report' = 'Reports',
    'account' = 'Accounts',
    'plans' = 'Plans'
}

export enum APPShellFeatureSet {
    'project' = 'anchor.projects.read',
    'user-global' = 'anchor.userGlobal.read',
    'asset' = 'anchor.assets.read',
    'features' = 'anchor.features.read',
    'plans' = 'anchor.plans.read',
    'report' = 'anchor.reports.read',
    'user' = 'anchor.iam.users.read',
    'user-group' = 'anchor.iam.userGroups.read',
    'roles' = 'anchor.iam.roles.read'

}

export enum AlignmentStrategy {
    Left = 'Left',
    Right = 'Right'
}

export enum ChartIconLight {
    Line = "./assets/Line.png",
    VBar = "./assets/VBar.png",
    HBar = "./assets/HBar.png",
    Pie = "./assets/Pie.png",
    DataGrid = "./assets/DataGrid.png",
    Map = "./assets/Map_lightIcon.png"
}
export enum ChartIconDark{
    Line = "./assets/Line_Dark.png",
    VBar = "./assets/VBar_Dark.png",
    HBar = "./assets/HBar_Dark.png",
    Pie = "./assets//Pie_Dark.png",
    DataGrid = "./assets/DataGrid_Dark.png",
    Map = "./assets/Map_NightMode.png"
}
// export enum AccountCreateReference {
//     AppmyIndia = 'AppmyIndia',
//     Event = 'Event',
//     SocialMedia = 'Social Media',
//     WordOfMouth = 'Word of mouth',
//     Emailer = 'Emailer',
//     Website = 'Website (mapmyindia.com)',
//     Referral = 'Referral Partner',
//     Others = 'Others'
// }
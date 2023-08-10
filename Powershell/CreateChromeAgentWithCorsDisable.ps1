# get chrome.exe shortcut
$ShortcutPath = '';

# check if chrome installed 
if (Test-Path -path 'C:\Program Files\Google\Chrome\Application\chrome.exe') {
    $ShortcutPath = 'C:\Program Files\Google\Chrome\Application\chrome.exe';
}
elsif (Test-Path -path 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe') {
    $ShortcutPath = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe';
}
else {
    # chrome is not installed on this machine..
    exit
}
# get desktop location
$DesktopLocation = [Environment]::GetFolderPath("Desktop");

# create temp file folder
New-Item -ItemType "directory" -Name "ChromeTempFiles" -Path ($DesktopLocation + '\');

# final Shortcut path
$ShortcutLocation = $DesktopLocation.ToString() + "\==Chrome - disabled CORS==.lnk";

#
$WScriptShell = New-Object -ComObject WScript.Shell;

# carate the Shortcut in the path (Desktop)
$Shortcut = $WScriptShell.CreateShortcut($ShortcutLocation);

# set the target exe file
$Shortcut.TargetPath = $ShortcutPath;

# add the --user-data-dir= with thae path to the temp_files folder && --disable-web-security
$Shortcut.Arguments = ' --user-data-dir="' + ($DesktopLocation + '\ChromeTempFiles') + '"  --disable-web-security';

# save
$Shortcut.Save();

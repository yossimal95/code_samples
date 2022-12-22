# get current location
$CurrentLocation = Get-Location;

# get Chrome.exe location
$ChromeExeLocation = $currentLocation.ToString() + "\chrome.exe";

# get temp filse directory
$TempFilesDirectoryLocation = $currentLocation.ToString() + "\temp";

# get desktop location
$DesktopPath = [Environment]::GetFolderPath("Desktop");

# target file path
$ShortcutLocation = $DesktopPath.ToString() + "\=== Chrome 104 ===.lnk"; 

# if exist file with the same name - delete it
if (Test-Path -Path $ShortcutLocation) {
    Remove-Item $ShortcutLocation;
}

# create script
$WScriptShell = New-Object -ComObject WScript.Shell;

# create shortcut object
$Shortcut = $WScriptShell.CreateShortcut($ShortcutLocation);

# add target path to the shortcut object
$Shortcut.TargetPath = $ChromeExeLocation.ToString();

# add --user-data-dir argument to the shortcut object
$Shortcut.Arguments = ' --user-data-dir="' + $TempFilesDirectoryLocation.ToString() + '"';

# save the shortcut file
$Shortcut.Save(); 

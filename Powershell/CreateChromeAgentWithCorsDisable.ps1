# get desktop location
$DesktopLocation = [Environment]::GetFolderPath("Desktop");

# create temp file folder
New-Item -ItemType "directory" -Name "ChromeTempFiles" -Path ($DesktopLocation + '\');

# final Shortcut path
$ShortcutLocation = $DesktopLocation.ToString() + "\==Chrome - disabled CORS==.lnk";

# create temp file folder
New-Item -ItemType "directory" -Name "ChromeTempFiles" -Path ($DesktopLocation + '\')

#
$WScriptShell = New-Object -ComObject WScript.Shell;

# carate the Shortcut in the path (Desktop)
$Shortcut = $WScriptShell.CreateShortcut($ShortcutLocation);

# set the target exe file
$Shortcut.TargetPath = 'C:\Program Files\Google\Chrome\Application\chrome.exe';

# add the --user-data-dir= with thae path to the temp_files folder && --disable-web-security
$Shortcut.Arguments = ' --user-data-dir="' + ($DesktopLocation + '\ChromeTempFiles') + '"  --disable-web-security';

# save
$Shortcut.Save();

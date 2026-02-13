## Disable chrome users
**Path:** HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome

**Key:** BrowserSignin 

**Type:** REG_DWORD

**Value:** 0

**Cmd Script:** reg add "HKLM\SOFTWARE\Policies\Google\Chrome" /v BrowserSignin /t REG_DWORD /d 0 /f

## Disable Start > web search
**Path:** HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\Explorer

**Key:** DisableSearchBoxSuggestions

**Type:** REG_DWORD

**Value:** 1

**Cmd script:** reg add "HKCU\Software\Policies\Microsoft\Windows\Explorer" /v DisableSearchBoxSuggestions /t REG_DWORD /d 1 /f 

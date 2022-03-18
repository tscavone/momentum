# Settings Data

Settings data is loaded first in the application. Like all other stores, it relies on persisted objects structured with the same member variable names. This allows for dynamic loading of objects without needing to manually set every single member variable.

However, with settings, there is additional metadata included in each setting: there are `_type` and `_valueMap` fields. This allows for dynamic creation of objects at store initialization, where `_type` is used to know which object to instantiate, and the `_valueMap` field indicates which member object the settings `value` is mapped to.

### to be removed

Changes needed

-   SettingsEntry should be abstract or there needs to be an abstract class or interface that enables things with entries and/or descriptions
-   then there needs to be a concrete SettingsEntry for the normal settings
-   Position and StretchQuestion need to inherit from that
-   there needs to be a way to setValue (which will map value to it's appropriate member i.e. 'value' for stretchQuesiton is '\_question')
-   change the settings data to account for this new scheme
-   update the settings load method to account for this new scheme
-   write jest tests to validate this stuff
-   Later change - when changes to certain sections of settings are made i.e. a stretch question is created or deleted, this should trigger a conf dialog, full save and reloading of appropriate store since there may now be values that don't have corresponding ones i.e. there may no longer be a stretch question for a particular stretch answer

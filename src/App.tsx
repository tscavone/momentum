import React from 'react';
import { useNoteStore } from './client/components/RootStoreProvider';
import { Box, WrapItem, VStack, FormControl, Select, FormLabel, Button,
         Tabs, TabList, Tab, TabPanels, TabPanel, Badge,
         Container } from "@chakra-ui/react";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import { DatePicker } from './client/components/DatePicker';
import { TopNav } from './client/components/TopNav';
import { NotesTab } from './client/components/NotesTab';


  const DateState = observable({
    currentDate : null
  })

  const App = observer( () => {


  return (
    <div className="App">
    <Box m={5}>
      <TopNav>
      <Tabs size='md' variant='enclosed'>
        <TabList>
          <Tab>Notes</Tab>
          <Tab>Stretch</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <NotesTab />
          </TabPanel>
          <TabPanel>
            Here are stretch questions
          </TabPanel>
        </TabPanels>
      </Tabs>
      </TopNav>
    </Box>
    </div>
  );
})

export default App;

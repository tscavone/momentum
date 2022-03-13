import React from 'react';
import { useNoteStore } from './client/components/RootStoreProvider';
import { Box, WrapItem, Heading, VStack, FormControl, Select, FormLabel, Button,
         Tabs, TabList, Tab, TabPanels, TabPanel, Drawer, DrawerBody, DrawerContent,
         DrawerOverlay, DrawerHeader, DrawerCloseButton, useDisclosure, Badge,
         Container } from "@chakra-ui/react";
import { observable } from 'mobx';
import { Id } from './client/util/Id';
import { DateRange } from './client/util/DateRange';
import { Text } from 'slate';
import escapeHtml from 'escape-html';
import { DatedObject } from './client/util/DatedObject';
import { Note } from './client/value_objects/Note';
import { RichTextBlock } from './client/components/RichTextBlock';
import { observer } from "mobx-react";
import { DatePicker } from './client/components/DatePicker';
import { ReportDrawer } from './client/components/ReportDrawer';


  //
  // example data
  //
  const exampleValue = [
    {
      type: "paragraph",
      children: [
        { text: "This is editable " },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        { text: "<textarea>", code: true },
        { text: "!" }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text "
        },
        { text: "bold", bold: true },
        {
          text:
            ", or add a semantically rendered block quote in the middle of the page, like this:"
        }
      ]
    },
    {
      type: "block-quote",
      children: [{ text: "A wise quote." }]
    },
    {
      type: "paragraph",
      children: [{ text: "Try it out for yourself!" }]
    }
  ];  

  //
  // Components
  //


  const NoteReport = ({note} : {note: DatedObject<Note>}) => {
  
    return (
      <VStack alignItems={"flex-start"}>
        <Box >
          <Badge>{note.date.toISOString().split('T')[0]}</Badge>
        </Box>
        <Container p={5} shadow='md' borderWidth='1px' w={[250,500]} borderRadius='md'
          dangerouslySetInnerHTML={{__html:note.obj.text}}>
        </Container>
      </VStack>
    )
  } 

  //
  //  Methods that need to go into somewhere 
  //
  const serialize = (node : any) => {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text)
      if ((node as any).bold) {
        string = `<strong>${string}</strong>`
      }
      return string
    }

    const children = node.children.map(n => serialize(n)).join('')

    switch (node.type) {
      case 'block-quote':
        return `<blockquote><p>${children}</p></blockquote>`
      case 'paragraph':
        return `<p>${children}</p>`
      case 'link':
        return `<a href="${escapeHtml(node.url)}">${children}</a>`
      default:
        return children
    }
  }

  //
  // Employee State
  //
  const employee = observable({
    id: "1234",
  })

  const DateState = observable({
    currentDate : null
  })

  const App = observer( () => {

  //
  // update functions
  //
  const noteStore = useNoteStore();

  //
  //drawer
  //
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const updateCurrentNote = (newValue) => {
    let id = new Id();
    id.id = employee.id
    noteStore.setCurrent(id, newValue.map((n) =>  serialize(n)).join(''));
  }

  const updateNotes = () => {
    let id = new Id();
    id.id = employee.id
    let currentDate = DateState.currentDate; 
    noteStore.save(id, currentDate ? currentDate : new Date());
  }

  const updateUser = (event) => {
    console.log("Update employee")
    employee.id = event.target.value;
  }

  return (
    <div className="App">
    <Box m={5}>
      <Heading>Momentum</Heading>
      <WrapItem>
        <Box m={8} p={5} border="1px" borderColor="lightblue" borderRadius="lg">
          <VStack  >
            <FormControl>
              <Select w={[200]} onChange={updateUser} defaultValue="1234" placeholder='Select employee'>
                <option value='1234'>User 1234</option>
                <option value='2345'>User 2345</option>
              </Select>

              <FormLabel htmlFor="currentDate">Date Simulation (debug)</FormLabel>
              <DatePicker value="" label="Current Date (debug)"
                onChange={(event) =>
                DateState.currentDate = new Date(event.target.value)} />
            </FormControl>
          </VStack>
        </Box>

      </WrapItem>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Report
      </Button>
      <Tabs size='md' variant='enclosed'>
        <TabList>
          <Tab>Notes</Tab>
          <Tab>Stretch</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
              <VStack>
                <Box w={[250, 500]}>
                  <RichTextBlock initialValue={exampleValue}
                    readonly={false}
                    updateCurrentNote={updateCurrentNote} />
                </Box>
                <Button onClick={updateNotes} >
                  Save Note
                </Button> 
              </VStack>
          </TabPanel>
          <TabPanel>
            Here are stretch questions
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ReportDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose} />

    </Box>
    </div>
  );
})

export default App;

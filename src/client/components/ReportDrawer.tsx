// import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader,
//     DrawerBody, VStack, Box, Badge, Container} from "@chakra-ui/react";
// import { DatedObject } from "../util/DatedObject";
// import { Note } from "../value_objects/Note";
// import { Id } from "../util/Id";

// const NoteReport = ({note} : {note: DatedObject<Note>}) => {
  
//     return (
//       <VStack alignItems={"flex-start"}>
//         <Box >
//           <Badge>{note.date.toISOString().split('T')[0]}</Badge>
//         </Box>
//         <Container p={5} shadow='md' borderWidth='1px' w={[250,500]} borderRadius='md'
//           dangerouslySetInnerHTML={{__html:note.obj.text}}>
//         </Container>
//       </VStack>
//     )
//   } 

// const ReportDrawer = ({isOpen, onClose}) => {
    
//     const getDisplayNotes = () => {
//         let id = new Id();
//         id.id = employee.id
    
//         let displayNotes : DatedObject<Note>[] = (noteStore.getSaved(id,
//           new DateRange(reportDates.reportStartDate, reportDates.reportEndDate)) as 
//           DatedObject<Note>[])
//         return displayNotes;
//     }

//     return (
//         <Drawer
//             isOpen={isOpen}
//             placement='right'
//             onClose={onClose}
//             size={"lg"}
//         >
//             <DrawerOverlay />
//             <DrawerContent>
//             <DrawerCloseButton />
//             <DrawerHeader>Leigh's Report</DrawerHeader>

//             <DrawerBody>
//                 <VStack>
//                     {
//                         getDisplayNotes().map((note, i) => {
//                             return (<NoteReport key={i} note={note} />)
//                         })
//                     }
//                 </VStack>
//             </DrawerBody>

//             </DrawerContent>
//         </Drawer>
//     );
// }

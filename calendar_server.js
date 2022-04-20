import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import e from 'express';

let assignments = [];

const assignmentFiles = 'assignment.json';

async function reload(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    assignments = JSON.parse(data);
  } catch (err) {
    assignments = [];
  }
}

async function saveAssignments() {
  try {
    const data = JSON.stringify(assignments);
    await writeFile(assignmentFiles, data, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

async function assignmentExists(assignment_id){
  if (assignments.filter(x => x['assignment_id'] === assignment_id).length > 0) {
  }
}

function getAssignmentIndex(assignment_id){
  const index = assignments.map(object => object['assignment_id']).indexOf(assignment_id);
  return index;
}


async function createAssignment(response, month, day, year, name, assignment_id, class_id) {
  if (assignment_id === undefined) {
    // 400 - Bad Request
    response.status(404).json({ error: `Assignment could not be created` });
    } 
  else {
    await reload(assignmentFiles);
    let newAssignment = {"month":month, 
                        "day": day, 
                        "year": year, 
                        "name": name, 
                        "assignment_id": assignment_id,
                        "class_id": class_id};
    assignments.push(newAssignment);
    await saveAssignments();
    response.json({month:month, day: day, year: year, name: name, assignment_id: assignment_id, class_id: class_id});
  }
}

async function readDate(response, month, day, year) {
  await reload(assignmentFiles);
  let assignmentDates = [];
  if (!(month === undefined || day === undefined || year === undefined)) {
    for( let i = 0; i < assignments.length; i++)
    {
      assignmentDates = assignments.filter(x => x['day'] === day && 
                                                x['month'] === month && 
                                                x['year'] === year);
    }
    response.json({ day:day, month: month, year:year, assignments: assignmentDates });
  } else {
    // 404 - Not Found
    response.json({ error: `No Assignments on '${month}' ${day}, ${year}` });
  }
}

async function updateAssignment(response, month, day, year, name, assignment_id, class_id) {
  await reload(assignmentFiles);
  if (assignmentExists(assignment_id)) {
    const index = getAssignmentIndex(assignment_id);
    assignments[index] = {"month":month, 
                          "day": day, 
                          "year": year, 
                          "name": name, 
                          "assignment_id": assignment_id, 
                          "class_id": class_id };
    await saveAssignments();
    response.json({month:month, day: day, year: year, name: name, assignment_id: assignment_id, class_id: class_id});
  } else {
    // 404 - Not Found
    response.status(404).json({ error: `Assignment '${name}' Not Found` });
  }
}

async function deleteAssignment(response, assignment_id) {
  await reload(assignmentFiles);
  if (assignmentExists(assignment_id)) {
    const index = getAssignmentIndex(assignment_id);
    assignments.splice(index, 1);
    await saveAssignments();
    response.json({ id:assignment_id });
  } else {
    // 404 - Not Found
    response.status(404).json({ error: `Assignment '${assignment_id}' Not Found` });
  }
}


const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/client', express.static('client'));

app.post('/createAssignment', async (request, response) => {
  const details = request.query;
  createAssignment(response, 
                  parseInt(details.month), 
                  parseInt(details.day), 
                  parseInt(details.year), 
                  details.name, 
                  parseInt(details.assignment_id),
                  parseInt(details.class_id));
});

app.get('/readDate', async (request, response) => {
  const details = request.query;
  readDate(response, 
          parseInt(details.month), 
          parseInt(details.day), 
          parseInt(details.year));
        });

app.put('/updateAssignment', async (request, response) => {
  const details = request.query;
  updateAssignment(response, 
                  parseInt(details.month), 
                  parseInt(details.day), 
                  parseInt(details.year), 
                  details.name, 
                  parseInt(details.assignment_id),
                  parseInt(details.class_id));
});

app.delete('/deleteAssignment', async (request, response) => {
  const details = request.query;
  deleteAssignment(response, parseInt(details.assignment_id));
});

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// NEW
app.listen(port, () => {
  console.log(`Server started on poart ${port}`);
});

import React from 'react'

export default function InternshipCard({ job }){
  // skills stored as CSV in backend schema (Prisma example)
  const skillsText = job.skills || ''
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>{job.title}</h3>
      <p style={{color:'#374151', margin:'6px 0'}}>{job.company} • {job.country}</p>
      {skillsText && <p style={{margin:'8px 0'}}><strong>Skills:</strong> {skillsText}</p>}
      <p style={{margin:'8px 0'}}><strong>Duration:</strong> {job.duration || 'N/A'}</p>
      <p className="small">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:12}}>
        <button className="btn">Apply</button>
        <small className="small">{job.description ? job.description.slice(0,80) + (job.description.length>80? '...':'') : ''}</small>
      </div>
    </div>
  )
}

/* ==========================================================================
   AETHERIA 3D KNOWLEDGE GRAPH & SHARED MEMORY ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Color Mapping per Data Pillar
  const PILLAR_COLORS = {
    Files: '#00f2fe',     // Cyan
    GitHub: '#a855f7',    // Purple
    Telegram: '#ff007f',  // Magenta/Pink
    Claude: '#ff9900',    // Amber Gold
    ChatGPT: '#00ff66'    // Electric Green
  };

  // Mock Initial Knowledge Graph Shared Memory Layer
  const rawGraphData = generateInitialKnowledgeGraph();

  let Graph;
  let selectedNode = null;
  let highlightedNodes = new Set();
  let highlightedLinks = new Set();

  // Initialize 3D Force Graph Engine
  init3DGraph();

  // Initialize UI Event Listeners
  initUI();

  // ==========================================================================
  // GRAPH INITIALIZATION & RENDER ENGINE
  // ==========================================================================
  function init3DGraph() {
    const container = document.getElementById('3d-graph');

    Graph = ForceGraph3D()(container)
      .graphData(rawGraphData)
      .backgroundColor('#030611')
      .showNavInfo(false)
      .nodeRelSize(7)
      .nodeId('id')
      .nodeVal(node => node.val || 5)

      // Dynamic Node Color & Glowing Badges
      .nodeColor(node => {
        if (highlightedNodes.size > 0 && !highlightedNodes.has(node.id)) {
          return 'rgba(40, 50, 70, 0.2)';
        }
        return PILLAR_COLORS[node.pillar] || '#00f2fe';
      })

      // Custom 3D Node Object (Sphere with floating text badge & glow)
      .nodeThreeObject(node => {
        const isSelected = selectedNode && selectedNode.id === node.id;
        const isDimmed = highlightedNodes.size > 0 && !highlightedNodes.has(node.id);

        const group = new THREE.Group();

        // 1. Core Sphere Mesh
        const colorHex = PILLAR_COLORS[node.pillar] || '#00f2fe';
        const sphereGeo = new THREE.SphereGeometry(isSelected ? 8 : 5, 16, 16);
        const sphereMat = new THREE.MeshBasicMaterial({
          color: isDimmed ? 0x223344 : colorHex,
          wireframe: isSelected,
          transparent: true,
          opacity: isDimmed ? 0.2 : 0.95
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        group.add(sphere);

        // 2. Outer Halo Glow Ring
        if (!isDimmed) {
          const ringGeo = new THREE.RingGeometry(6, 7.5, 32);
          const ringMat = new THREE.MeshBasicMaterial({
            color: colorHex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.4
          });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.lookAt(Graph.camera().position);
          group.add(ring);
        }

        // 3. Floating 3D Text Label Canvas Billboard
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;

        ctx.fillStyle = 'rgba(6, 11, 25, 0.85)';
        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 44, 10);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'Bold 16px Space Grotesk, sans-serif';
        ctx.fillStyle = isDimmed ? '#667788' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const truncateText = node.title.length > 20 ? node.title.substring(0, 18) + '...' : node.title;
        ctx.fillText(`[${node.pillar}] ${truncateText}`, 128, 32);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: isDimmed ? 0.25 : 0.95
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(0, 12, 0);
        sprite.scale.set(24, 6, 1);
        group.add(sprite);

        return group;
      })

      // Link Mechanics (Dense illuminated path network)
      .linkWidth(link => {
        if (highlightedLinks.has(link)) return 3;
        return 0.8;
      })
      .linkColor(link => {
        if (highlightedLinks.has(link)) return '#00f2fe';
        if (highlightedNodes.size > 0) return 'rgba(255,255,255,0.03)';
        return 'rgba(0, 242, 254, 0.15)';
      })
      .linkDirectionalParticles(link => (highlightedLinks.has(link) ? 5 : 1))
      .linkDirectionalParticleWidth(link => (highlightedLinks.has(link) ? 2.5 : 1))
      .linkDirectionalParticleSpeed(0.006)
      .linkDirectionalParticleColor(() => '#00f2fe')

      // Node Interaction Events
      .onNodeClick(node => {
        isolateNodeNetwork(node);
      })
      .onNodeHover(node => {
        document.body.style.cursor = node ? 'pointer' : 'default';
      })
      .onNodeDragEnd(node => {
        // Fix node position after drag pull physics
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      });

    // Spread graph physics out for initial clear spatial view
    Graph.d3Force('charge').strength(-140);

    // Initial camera position adjustment
    Graph.cameraPosition({ x: 0, y: 0, z: 320 });
  }

  // ==========================================================================
  // NETWORK ISOLATION & FOCUS LOGIC
  // ==========================================================================
  function isolateNodeNetwork(node) {
    highlightedNodes.clear();
    highlightedLinks.clear();

    if (node && selectedNode !== node) {
      selectedNode = node;
      highlightedNodes.add(node.id);

      // Find all 1-hop connected neighbors
      rawGraphData.links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        if (sourceId === node.id) {
          highlightedNodes.add(targetId);
          highlightedLinks.add(link);
        } else if (targetId === node.id) {
          highlightedNodes.add(sourceId);
          highlightedLinks.add(link);
        }
      });

      // Camera smooth transition to focus node
      const distance = 120;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      Graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
        node,
        1500
      );

      updateSidebarDetails(node);
    } else {
      // Deselect & Reset Focus
      selectedNode = null;
      updateSidebarDetails(null);
    }

    // Trigger graph refresh
    Graph.nodeThreeObject(Graph.nodeThreeObject());
    Graph.linkColor(Graph.linkColor());
    Graph.linkWidth(Graph.linkWidth());
  }

  // ==========================================================================
  // SIDEBAR & UI LOGIC
  // ==========================================================================
  function initUI() {
    // Sidebar toggle button
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      sidebarToggle.innerText = sidebar.classList.contains('collapsed') ? '▶' : '◀';
    });

    // Reset camera focus button
    document.getElementById('reset-focus').addEventListener('click', () => {
      isolateNodeNetwork(null);
      Graph.cameraPosition({ x: 0, y: 0, z: 320 }, { x: 0, y: 0, z: 0 }, 1200);
    });

    // Ingest Modal handlers
    const modal = document.getElementById('ingest-modal');
    document.getElementById('open-add-modal').addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
    document.getElementById('close-modal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    document.getElementById('cancel-modal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // Handle Add New Memory Node Form Submission
    document.getElementById('ingest-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('memory-title').value;
      const pillar = document.getElementById('memory-pillar').value;
      const summary = document.getElementById('memory-summary').value;

      const newNodeId = `MEM-${Math.floor(1000 + Math.random() * 9000)}`;
      const newNode = {
        id: newNodeId,
        title: title,
        pillar: pillar,
        summary: summary,
        val: 8,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 100
      };

      rawGraphData.nodes.push(newNode);

      // Create random memory links with existing nodes in same or neighboring pillars
      const existingNodes = rawGraphData.nodes.filter(n => n.id !== newNodeId);
      const linkCount = Math.floor(Math.random() * 3) + 2;

      for (let i = 0; i < linkCount; i++) {
        const randomTarget = existingNodes[Math.floor(Math.random() * existingNodes.length)];
        rawGraphData.links.push({
          source: newNodeId,
          target: randomTarget.id
        });
      }

      // Update Graph
      Graph.graphData(rawGraphData);

      // Add log to terminal
      addTerminalLog(pillar, `Ingested new memory [${newNodeId}]: ${title}`);

      // Reset form & close modal
      document.getElementById('ingest-form').reset();
      modal.classList.add('hidden');

      // Focus new node
      setTimeout(() => isolateNodeNetwork(newNode), 500);
    });

    // Pillar Filtering Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const pillar = btn.getAttribute('data-pillar');
        if (pillar === 'all') {
          Graph.graphData(rawGraphData);
        } else {
          const filteredNodes = rawGraphData.nodes.filter(n => n.pillar === pillar);
          const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
          const filteredLinks = rawGraphData.links.filter(l => {
            const s = typeof l.source === 'object' ? l.source.id : l.source;
            const t = typeof l.target === 'object' ? l.target.id : l.target;
            return filteredNodeIds.has(s) && filteredNodeIds.has(t);
          });
          Graph.graphData({ nodes: filteredNodes, links: filteredLinks });
        }
      });
    });

    // Node Search Input Filtering
    document.getElementById('node-search').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        isolateNodeNetwork(null);
        return;
      }
      const matchedNode = rawGraphData.nodes.find(n =>
        n.title.toLowerCase().includes(query) || n.summary.toLowerCase().includes(query)
      );
      if (matchedNode) {
        isolateNodeNetwork(matchedNode);
      }
    });

    // Periodically simulate background shared memory sync log entries
    setInterval(() => {
      const pillars = ['Files', 'GitHub', 'Telegram', 'Claude', 'ChatGPT'];
      const randomPillar = pillars[Math.floor(Math.random() * pillars.length)];
      const events = [
        'Optimized vector cosim matrix',
        'Updated cross-model memory index',
        'Re-clustered semantic embeddings',
        'Received shared memory sync pulse',
        'Ingested unstructured query context'
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      addTerminalLog(randomPillar, `${randomEvent} across graph nodes.`);
    }, 9000);
  }

  // Update Sidebar Card Details
  function updateSidebarDetails(node) {
    const emptyState = document.querySelector('.card-empty-state');
    const activeContent = document.getElementById('card-active-content');

    if (!node) {
      emptyState.classList.remove('hidden');
      activeContent.classList.add('hidden');
      document.getElementById('selected-pillar-badge').innerText = 'MEMORY CORE';
      return;
    }

    emptyState.classList.add('hidden');
    activeContent.classList.remove('hidden');

    document.getElementById('detail-node-id').innerText = `#${node.id}`;
    document.getElementById('detail-node-pillar').innerText = node.pillar;
    document.getElementById('detail-node-pillar').style.color = PILLAR_COLORS[node.pillar];
    document.getElementById('selected-pillar-badge').innerText = node.pillar.toUpperCase();

    document.getElementById('detail-node-title').innerText = node.title;
    document.getElementById('detail-node-summary').innerText = node.summary;

    // Count connections
    const neighbors = [];
    rawGraphData.links.forEach(link => {
      const sId = typeof link.source === 'object' ? link.source.id : link.source;
      const tId = typeof link.target === 'object' ? link.target.id : link.target;

      if (sId === node.id) {
        const neighbor = rawGraphData.nodes.find(n => n.id === tId);
        if (neighbor) neighbors.push(neighbor);
      } else if (tId === node.id) {
        const neighbor = rawGraphData.nodes.find(n => n.id === sId);
        if (neighbor) neighbors.push(neighbor);
      }
    });

    document.getElementById('detail-connections').innerText = neighbors.length;
    document.getElementById('detail-weight').innerText = (0.85 + Math.random() * 0.14).toFixed(2);

    const listContainer = document.getElementById('connections-list');
    listContainer.innerHTML = '';
    neighbors.forEach(n => {
      const li = document.createElement('li');
      li.innerHTML = `<span>[${n.pillar}] ${n.title}</span> <span style="color:${PILLAR_COLORS[n.pillar]}">●</span>`;
      li.addEventListener('click', () => isolateNodeNetwork(n));
      listContainer.appendChild(li);
    });
  }

  // Add Log Entry to Shared Memory Terminal
  function addTerminalLog(pillar, message) {
    const termBody = document.getElementById('terminal-body');
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="time">[${timeStr}]</span> <span class="pillar ${pillar.toLowerCase()}">${pillar}</span> ${message}`;

    termBody.appendChild(entry);
    termBody.scrollTop = termBody.scrollHeight;
  }

  // ==========================================================================
  // INITIAL MOCK DATA MODEL GENERATOR (Shared Graph Schema)
  // ==========================================================================
  function generateInitialKnowledgeGraph() {
    const nodes = [
      // Files Pillar
      { id: 'FILE-101', title: 'System Architecture v3.pdf', pillar: 'Files', summary: 'Core specification for Mem0 shared vector database integration across agent models.', val: 10 },
      { id: 'FILE-102', title: 'threejs_render_pipeline.js', pillar: 'Files', summary: 'WebGL shaders and particle trajectory calculators.', val: 7 },
      { id: 'FILE-103', title: 'dataset_embeddings.parquet', pillar: 'Files', summary: '1.2M vector embeddings extracted from code bases.', val: 8 },

      // GitHub Pillar
      { id: 'GH-201', title: 'PR #142: Graph Damping Physics', pillar: 'GitHub', summary: 'Fixed spring constraint calculation in 3D canvas force loop.', val: 8 },
      { id: 'GH-202', title: 'Issue #89: Memory Leak in Orbit', pillar: 'GitHub', summary: 'Resolved geometry disposal during node filtering.', val: 6 },
      { id: 'GH-203', title: 'Release v3.8.0-Alpha', pillar: 'GitHub', summary: 'Deploying unified vector memory sync hooks.', val: 9 },

      // Telegram Pillar
      { id: 'TG-301', title: 'Voice Note: Vector Clustering', pillar: 'Telegram', summary: 'Raw Audio Transcript: Idea to group Claude reasoning traces with GitHub commits.', val: 7 },
      { id: 'TG-302', title: 'Chat Note: Latency Goals', pillar: 'Telegram', summary: 'Sub-20ms vector lookups needed for real-time agent memory.', val: 6 },

      // Claude Pillar
      { id: 'CL-401', title: 'Deep Thinking: Cognitive Mesh', pillar: 'Claude', summary: 'Long-context analysis on persistent memory storage and multi-agent synergy.', val: 11 },
      { id: 'CL-402', title: 'Refactoring Spatial Layouts', pillar: 'Claude', summary: 'Mathematical breakdown of 3D node billboard positioning in camera frustums.', val: 9 },

      // ChatGPT Pillar
      { id: 'GPT-501', title: 'Prompt Trace: Fast Graph Query', pillar: 'ChatGPT', summary: 'Quick heuristic lookup queries generated for vector similarity search.', val: 8 },
      { id: 'GPT-502', title: 'Chat Session: Cytoscape vs Three.js', pillar: 'ChatGPT', summary: 'Comparative performance benchmarks for 10,000 edge network rendering.', val: 7 }
    ];

    // Generate interconnecting multi-directional links
    const links = [
      { source: 'FILE-101', target: 'CL-401' },
      { source: 'FILE-101', target: 'GH-203' },
      { source: 'FILE-102', target: 'GH-201' },
      { source: 'FILE-102', target: 'GPT-502' },
      { source: 'GH-201', target: 'GH-202' },
      { source: 'TG-301', target: 'CL-401' },
      { source: 'TG-301', target: 'FILE-103' },
      { source: 'TG-302', target: 'GPT-501' },
      { source: 'CL-401', target: 'CL-402' },
      { source: 'CL-402', target: 'FILE-102' },
      { source: 'GPT-501', target: 'GH-203' },
      { source: 'FILE-103', target: 'GPT-501' }
    ];

    // Add procedurally generated dense background nodes to populate a vast 3D universe
    const pillars = ['Files', 'GitHub', 'Telegram', 'Claude', 'ChatGPT'];
    for (let i = 1; i <= 35; i++) {
      const p = pillars[i % pillars.length];
      const nodeId = `NODE-${100 + i}`;
      nodes.push({
        id: nodeId,
        title: `${p} Vector Fragment #${i}`,
        pillar: p,
        summary: `Automated vector embedding index segment linked to central ${p} memory repository.`,
        val: 4 + (i % 5)
      });

      // Connect to a primary pillar node
      const primaryTarget = nodes[i % 10].id;
      links.push({ source: nodeId, target: primaryTarget });
    }

    return { nodes, links };
  }
});
